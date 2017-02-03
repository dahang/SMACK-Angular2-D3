

package com.websphone.sparkstreaming

import java.util.HashMap

import org.apache.spark.SparkConf
import org.apache.spark.streaming._
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.twitter._
import com.datastax.spark.connector._
import org.joda.time.format.DateTimeFormat
import com.datastax.spark.connector.streaming._

//import org.apache.log4j.Level
import Utilities._

/** Simple application to listen to a stream of Tweets and print them out */
object TrumpTweets {

  def timeToStr(epochMillis: Long): String =
    DateTimeFormat.forPattern("YYYY-MM-dd HH:mm:ss").print(epochMillis)

  /** Our main function where the action happens */
  def TrumpTweets(args: Array[String]) {
    setupLogging()
    // Configure Twitter credentials using twitter.txt
    setupTwitter()

    val filters = new HashMap[String, String]()
    filters.put("follow", "25073877")
    val screenName = "realdonaldtrump"

    // Set up the Cassandra host address
    val conf = new SparkConf()
    conf.set("spark.cassandra.connection.host", "127.0.0.1")
    conf.setMaster("local[*]")
    conf.setAppName("TrumpTweets")

    // Set up a Spark streaming context named "PrintTweets" that runs locally using
    // all CPU cores and one-second batches of data
    val ssc = new StreamingContext(conf, Seconds(1))

    // Get rid of log spam (should be called after the context is set up)
    setupLogging()

    // Create a DStream from Twitter using our streaming context
    val tweets = TwitterUtils.createStream(ssc, None, filters, StorageLevel.MEMORY_ONLY_SER_2)

    val status = tweets.filter(status => status.getUser.getId == 25073877)
      .map(status => (status.getId, status.getText, status.isRetweet, status.getUser.getStatusesCount, status.getCreatedAt.getTime))
      .foreachRDD((rdd, time) => {
        rdd.cache()
        if (rdd.count() >= 1) {
          println("Writing " + rdd.count() + " rows to Cassandra " + timeToStr(time.milliseconds))
          rdd.saveToCassandra(screenName, "tweets", SomeColumns("id", "status_text", "is_retweet", "tweet_count", "created_at"))
        }
      })

    // Kick it all off
    ssc.checkpoint("./target/checkpoint/")
    ssc.start()
    ssc.awaitTermination()
  }
}