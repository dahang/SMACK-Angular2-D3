import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from '@reactivex/rxjs';

import * as d3 from 'd3';
import * as cloud from '../../vendor/d3.layout.cloud';
import * as texJson from '../shared/textJson';
import {IWordsSource, WordClodService } from '../shared/word-cloud/word-cloud.service';


@Component({
  selector: 'app-nlp-demo',
  templateUrl: './nlp-demo.component.html',
  styleUrls: ['./nlp-demo.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NlpDemoComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private dataSource: Array<IWordsSource>;

  textInput: string;

  private fillColor: any;

  private wordCloud: any; // d3.Selection; 

  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private element: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private max: number = 250;

  private Rotate() {
    return d3.scaleLinear().domain([0, 9]).range([-60, 60])(Math.random() * 10);
  }

  private FontSize(t) {
    return d3.scaleLog()
      .range([10, 120])
      .domain([+this.dataSource[this.dataSource.length - 1].value || 1, +this.dataSource[0].value])(t.value);
  }

  private progress(t) {
    console.log(t);
  }

  private generateLayout(dataSource: Array<IWordsSource>): void {

    cloud().timeInterval(10).size([this.width, this.height]).fontSize((t: any) => this.FontSize(t)).text((t) => {
      return t.key;
    }).rotate(this.Rotate)
      .font('Charcoal')
      .spiral('archimedean')
      .stop()
      .words(dataSource.slice(0, this.max = Math.min(dataSource.length, this.max)))
      .start()
      .on('word', this.progress).on('end', ((tags: any, e: any) => this.draw(tags, e)));
  }

  private draw(words: any, e: any): void {
    this.wordCloud.selectAll('text')
      .data(words, (t: any) => {
        return t.text.toLowerCase();
      })
      .enter().append('text')
      .attr('transform', (d) => {
        return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
      })
      .style('font-size', (t) => { return t.size + 'px'; })
      .style('font-family', (t) => { return t.font; })
      .style('fill', (t) => {
        return this.fillColor(t.text.toLowerCase());
      })
      .attr('text-anchor', 'middle')
      .text((d) => { return d.text; });
  }


  private draw2(tags: any, e: any): void {

    const svg = d3.select(this.element).append('svg').attr('width', this.width).attr('height', this.height);
    const background = svg.append('g');
    const vis = svg.append('g').attr('transform', 'translate(' + [this.width >> 1, this.height >> 1] + ')');

    const scale = e ? Math.min(this.width / Math.abs(e[1].x - this.width / 2),
      this.width / Math.abs(e[0].x - this.width / 2),
      this.height / Math.abs(e[1].y - this.height / 2),
      this.height / Math.abs(e[0].y - this.height / 2)) / 2 : 1;

    const words = tags;
    const n = vis.selectAll('text').data(words, (t: any) => {
      return t.text.toLowerCase();
    });
    n.transition().duration(1e3).attr('transform', (t) => {
      return 'translate(' + [t.x, t.y] + ')rotate(' + t.rotate + ')';
    }).style('font-size', (t) => {
      return t.size + 'px';
    });
    n.enter().append('text').attr('text-anchor', 'middle').attr('transform', (t) => {
      return 'translate(' + [t.x, t.y] + ')rotate(' + t.rotate + ')';
    }).style('font-size', '1px').transition().duration(1e3).style('font-size', (t) => {
      return t.size + 'px';
    });
    n.style('font-family', (t) => {
      return t.font;
    }).style('fill', (t) => {
      return this.fillColor(t.text.toLowerCase());
    }).text((t) => {
      return t.text;
    });
    const a = background.append('g').attr('transform', vis.attr('transform'));
    const r = a.node();
    n.exit().each((node) => {
      // r.appendChild(this);
    });
    a.transition().duration(1e3).style('opacity', 1e-6).remove();
    vis.transition()
      .delay(1e3)
      .duration(750)
      .attr('transform', 'translate(' + [this.width >> 1, this.height >> 1] + ')scale(' + scale + ')');

  }

  constructor(private _wordClodService: WordClodService) {
    this.dataSource = texJson(texJson); // todo Observable;
  }


  ngOnInit(): void {
    this.element = this.chartContainer.nativeElement;
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;

    this.fillColor = d3.scaleOrdinal(d3.schemeCategory20);

    this.wordCloud = d3.select(this.element).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

    // this.generateLayout(this.dataSource);
  }

  onClickRefresh(): void {
    this.generateLayout(this.dataSource);
  }

  onClickGenerate(): void {
    console.log(this.textInput);
    this.dataSource = this._wordClodService.parseText(this.textInput);

    this.generateLayout(this.dataSource);
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {

  }
}
