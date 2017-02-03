import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NlpDemoComponent } from './nlp-demo/nlp-demo.component';
import { TwitterStreamingComponent } from './twitter-streaming/twitter-streaming.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/github-profile',
        pathMatch: 'full'
    },
    {
        path: 'github-profile',
        component: GithubProfileComponent
    },
    {
        path: 'nlp-demo',
        component: NlpDemoComponent
    },
    {
        path: 'twitter-streaming',
        component: TwitterStreamingComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [];
