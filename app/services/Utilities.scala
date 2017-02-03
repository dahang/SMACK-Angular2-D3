package com.websphone.sparkstreaming

import org.apache.log4j.Level
import java.util.regex.Pattern
import java.util.regex.Matcher

import com.typesafe.config.{ Config, ConfigFactory }


object Utilities {
  /** Makes sure only ERROR messages get logged to avoid log spam. */
  def setupLogging() = {
    import org.apache.log4j.{Level, Logger}
    val rootLogger = Logger.getRootLogger()
    rootLogger.setLevel(Level.ERROR)
    Logger.getLogger("org").setLevel(Level.ERROR)
  }

  /** Configures Twitter service credentials using twiter.txt in the main workspace directory */
  def setupTwitter() = {
    import com.typesafe.config.{ Config, ConfigFactory }

    val config = ConfigFactory.load("twitter")

    val consumerKey = config.getString("consumerKey")
    val consumerSecret = config.getString("consumerSecret")
    val accessToken = config.getString("accessToken")
    val accessTokenSecret = config.getString("accessTokenSecret")

    System.setProperty("twitter4j.oauth." + "consumerKey" , consumerKey)
    System.setProperty("twitter4j.oauth." + "consumerSecret" , consumerSecret)
    System.setProperty("twitter4j.oauth." + "accessToken" , accessToken)
    System.setProperty("twitter4j.oauth." + "accessTokenSecret" , accessTokenSecret)

//    for (line <- config.fromFile("./twitter.txt").getLines) {
//      val fields = line.split(" ")
//      if (fields.length == 2) {
//        System.setProperty("twitter4j.oauth." + fields(0), fields(1))
//      }
//    }
  }

  /** Retrieves a regex Pattern for parsing Apache access logs. */
  def apacheLogPattern():Pattern = {
    val ddd = "\\d{1,3}"
    val ip = s"($ddd\\.$ddd\\.$ddd\\.$ddd)?"
    val client = "(\\S+)"
    val user = "(\\S+)"
    val dateTime = "(\\[.+?\\])"
    val request = "\"(.*?)\""
    val status = "(\\d{3})"
    val bytes = "(\\S+)"
    val referer = "\"(.*?)\""
    val agent = "\"(.*?)\""
    val regex = s"$ip $client $user $dateTime $request $status $bytes $referer $agent"
    Pattern.compile(regex)
  }
}