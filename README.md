
<img src="https://user-images.githubusercontent.com/114015/102698819-40daf980-420e-11eb-889d-550e1a44c253.png" width="400px"/>

This tool generates a bubble chart script for Gnuplot

[![GitHub Release](https://img.shields.io/github/release/thiagodnf/bubble-chart-for-gnuplot.svg)](https://github.com/thiagodnf/bubble-chart-for-gnuplot/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/thiagodnf/bubble-chart-for-gnuplot.svg)](https://github.com/thiagodnf/bubble-chart-for-gnuplot/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/thiagodnf/bubble-chart-for-gnuplot.svg)](https://github.com/almende/thiagodnf/bubble-chart-for-gnuplot)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Usage

You need to enter labels separated by ";". Further information, use the "example" option on app. Generate the script and run following command on terminal:

```sh
$ gnuplot script.gnu
```

Next, you can see some examples of generated results.

#### One Quadrant

The following code generates a chart with one Information:

```text
Red;Circle;10
White;Triangle;4
Red;Triangle;8
Green;Ellipse;1
Blue;Rectangle;15
```

The result is:

![alt tag](https://raw.githubusercontent.com/thiagodnf/bubble-chart-for-gnuplot/master/public/images/example_1.png)

#### Two Quadrants

Separate the information using the "#" character. The following code generates a chart with two information:

```text
Red;Circle;10
White;Triangle;4
Red;Triangle;8
Green;Ellipse;1
Blue;Rectangle;15
#
Gold;Circle;6
Silver;Rectangle;2
Silver;Triangle;7
Iron;Triangle;9
Titanium;Rectangle;1
```

The result is:

![alt tag](https://raw.githubusercontent.com/thiagodnf/bubble-chart-for-gnuplot/master/public/images/eample%20_2.png)

#### Four Quadrants

Separate the information using the "#" character. The following code generates a chart with two information:

```
Red;Circle;10
White;Triangle;4
Red;Triangle;8
Green;Ellipse;1
Blue;Rectangle;15
#
Gold;Circle;6
Silver;Rectangle;2
Silver;Triangle;7
Iron;Triangle;9
Titanium;Rectangle;1
#
Red;Circle;10
White;Triangle;4
Red;Triangle;8
Green;Ellipse;1
Blue;Rectangle;15
#
Gold;Circle;6
Silver;Rectangle;2
Silver;Triangle;7
Iron;Triangle;9
Titanium;Rectangle;1
```

The result is:

![Screen Shot 2020-12-21 at 9 08 42 PM](https://user-images.githubusercontent.com/114015/102840369-b7275980-43d0-11eb-94d3-0ed9cf4c110a.png)


## Screenshots

![Screen Shot 2020-12-19 at 3 32 14 PM](https://user-images.githubusercontent.com/114015/102698977-66b4ce00-420f-11eb-837a-0de6c6feac8d.png)

## For Developers

To run this project, run the following command:

```sh
npm run dev
```

If you want to commit some changes, run the following command:

```sh
npm run lint-fix
```

## Q&A

* How can I increase the circle size?

    * Use the SCALE option to increase or decrease the circle size.

## Questions or Suggestions

Feel free to create <a href="https://github.com/thiagodnf/bubble-chart-for-gnuplot/issues">issues</a> here as you need

## Contribute

Contributions to the this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.

## Authors

* **Thiago Ferreira** - *Initial work*

See also the list of [contributors](https://github.com/thiagodnf/bubble-chart-for-gnuplot/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Donate

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

<a href="https://www.buymeacoffee.com/thiagodnf" target="_blank">
  <img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg" alt="Buy Me A Coffee">
</a>
<br/>
<br/>
Thanks! ❤️
