---
layout: post
title:  "Deploying Ember CLI apps to GitHub Pages"
date:   2015-09-22 00:31:00
categories: ember github git
---
## Background

While there are tools that can help automate this process (such as [ember-cli-github-pages][ember-cli-github-pages]), it might be helpful to understand how this process works manually.

## Preparation

The `url` CSS datatype should reference image data with a path like `url('images/foo.png')`\*. Images embedded into templates should reference image data with a path such as `assets/images/foo.png`\*.

It is important to not prefix the path with `/`, since this is a full path on the HTTP server and not relative to `ENV.baseURL`.

After that, ensure that `config/environment.js` contains:

{% highlight javascript %}
if (environment === 'production') {
  ENV.baseURL = '/project-name';
  ENV.locationType = 'hash';
}
{% endhighlight %}

\* *where `foo.png` is an image at `project-name/public/assets/images/foo.png`.*

## Build

Use `ember build --environment production` to build the project to `dist/`.

## Deploy to GitHub

First, we'll checkout the `gh-pages` branch (see [Creating Project Pages manually][creating-project-pages-manually] if you need to create a `gh-pages` branch) with:

{% highlight bash %}
git checkout --orphan gh-pages
{% endhighlight %}

Copy the app build into the root of the repository:

{% highlight bash %}
cp -R dist/* ./
{% endhighlight %}

Add relevant files (not node_modules/, README.md, etc)

{% highlight bash %}
git add index.html assets/
{% endhighlight %}

Commit and push the changes:

{% highlight bash %}
git commit -m 'update gh-pages to a73f45e' && git push
{% endhighlight %}

## After Action Review

The changes to GitHub pages can take several seconds (around 5-30 seconds) to take effect. Instead of manually creating the `gh-pages` branch, you can [create pages with the automatic generator][creating-pages-with-the-automatic-generator].

[ember-cli-github-pages]: https://github.com/poetic/ember-cli-github-pages/
[creating-project-pages-manually]: https://help.github.com/articles/creating-project-pages-manually/
[creating-pages-with-the-automatic-generator]: https://help.github.com/articles/creating-pages-with-the-automatic-generator/
