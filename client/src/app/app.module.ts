import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NlpDemoComponent } from './nlp-demo/nlp-demo.component';
import { TwitterStreamingComponent } from './twitter-streaming/twitter-streaming.component';

import { GithubService } from './shared/github-service.service';
import {IWordsSource, WordClodService } from './shared/word-cloud/word-cloud.service';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    GithubProfileComponent,
    NlpDemoComponent,
    TwitterStreamingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    HttpModule
  ],
  providers: [
    GithubService,
    WordClodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
