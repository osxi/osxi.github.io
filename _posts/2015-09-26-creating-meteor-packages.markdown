---
layout: post
title:  "Creating Meteor Packages"
date:   2015-09-26 12:00:00
categories: meteor
---
### Background

The goal of this article is to get you up and running with developing your own Meteor packages. We'll cover creating the package itself, adding packages to a package, and exporting Javascript objects to be accessed from within a Meteor app.

### Creating a Meteor Package

The first thing we need to do is create the package itself.

We need to `cd` to wherever we wish to create the package's folder:
{% highlight bash %}
cd ~/code/
{% endhighlight %}

Where we create our package can be in the usual place you store all of your repositories or it can be the root directory of an existing Meteor project.

Now we actually create the package:
{% highlight bash %}
meteor create --package osxi:fancy-package
{% endhighlight %}

This will create the basic file structure:
{% highlight bash %}
$ ls -alh
-rw-r--r-- 1 osxi staff   0B Sep 26 13:29 README.md
-rw-r--r-- 1 osxi staff 121B Sep 26 13:29 fancy-package-tests.js
-rw-r--r-- 1 osxi staff  33B Sep 26 13:29 fancy-package.js
-rw-r--r-- 1 osxi staff 658B Sep 26 13:29 package.js
{% endhighlight %}

### Developing Our Package Within a Meteor App

We can add our package to an existing Meteor app and develop continue to develop the package. Changes to the package contents will cause the Meteor app to live reload.

To do this, we can create a symbolic link within the `packages` fold of our Meteor app, such as:

{% highlight bash %}
$ ln -s ~/path/to/fancy-package ~/path/to/meteor-app/packages/
{% endhighlight %}

Then, we have to install the package into the Meteor app:

{% highlight bash %}
$ meteor add osxi:fancy-package
{% endhighlight %}

### Adding Packages to Our Package

Adding packages to our package is useful when we want to have access to other Meteor packages such as the `lodash` library.

For example, to add the [`stevezhu:lodash`][stevezhu_lodash] (a popular wrapper for the `lodash` library) package to our package, we can change our `package.js` to look like:

{% highlight javascript %}
Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');
  api.use('stevezhu:lodash', ['server', 'client']);
  api.addFiles('env-load.es6.js');
});
{% endhighlight %}

At this point, we now have access to the globals that [`stevezhu:lodash`][stevezhu_lodash] exports, which are `_` and `lodash` from the server and from the client.

### Exposing Objects

Exposing objects from a package into a Meteor app is the bread and butter of packages. We can do things like create an object with various methods that we wish to access from an app, such as string inflectors, math libraries, or NPM packages wrapped as global objects.

A simple example would be the following code in our `fancy-package.js` file:

{% highlight javascript %}
ComplicatedMath = {
  addOne(n) {
    return n + 1;
  }
}
{% endhighlight %}

and then manipulating `package.js` to look something like:

{% highlight javascript %}
Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');
  api.addFiles('fancy-package.js');
  api.export('ComplicatedMath', ['server', 'client']);
});
{% endhighlight %}

### After Action Review

This article only covered a handful of the various capabilities and use cases for Meteor packages. See the Further Reading section for links ot more resources on developing Meteor packages.

### Further Reading

The [official Meteor docs for package.js][packagejs] are a great place check out the various components of the Meteor package API. [Atmosphere][atmosphere] also has a great guide for publishing packages. There are, as you can imagine, a great amount of blog articles and answered questions regarding packages on [Stack Overflow][stackoverflow].

[stevezhu_lodash]: https://atmospherejs.com/stevezhu/lodash
[packagejs]: http://docs.meteor.com/#/full/packagejs
[atmosphere]: https://atmospherejs.com/i/publishing
[stackoverflow]: http://stackoverflow.com/search?q=meteor+package
