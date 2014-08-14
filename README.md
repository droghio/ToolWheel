ToolWheel
===============

***A in circular widget library. I have had enough of the box's tyrannous rule of the web.***



##DEMO

[Social Wheel]("http://htmlpreview.github.io/?https://github.com/droghio/ToolWheel/blob/master/SocialWheelDemo/index.html")
[Variable Elements]("http://htmlpreview.github.io/?https://github.com/droghio/ToolWheel/blob/master/SocialWheelDemo/index.html")



###SETUP

Make sure you have the jQuery and jQuery UI scripts included in your html file.

    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>


Now include the the twCircle base code by adding the js and css files into your html document.

    <script type="text/javascript" src="twCircle.js"></script>
    <link rel="stylesheet" href="twCircle.css"></link>

  
  
###CONSTRUCTING

Once the necessary files are in place you can make a widget by calling the constructor:

      var widget = new twCircle(contentArray)
  
**NOTE:** Make sure your DOM is loaded first! (jQuery.ready was called.)
  
The content array should be an array of elements you want in the widget.
You can included html strings, values, anything you want.

The widget will automatically spawn "markers" to contain each element, and resize them as necessary to fit in the bounding circle.

By default the constructor will append the widget to the body of your html document, but you can specify a parent to append the widget to, or point the constructor to a bounding circle already in your code.

Check out the documentation for more details, but here is the basic signature:
        
        function twCircle(content, index, parentselector, size, padding, rotation)
    
Besides content every parameter is optional, and can be accessed post construction, for example:

    circle.rotation = 45
    circle.padding = 8
    circle.r = 80 //Size is the diameter of the circle, r is the radius. Use r.
       
By default your changes will not be applied, and your new widget will be hidden.
To tell the circle to reveal itself and update its DOM call its animateIn method.

    circle.animateIn(callback)
  
To hide a circle there is an animateOut method.

    circle.animateOut(callback)
  
Both methods have an optional callback.
        
If you hate the animation you can also present the widget it manually.

    a = new twCircle(["hi"])
    a.updateDOM() //Update's bounding circle.
    a.calcMarkerGeo(); //Calculates layout of the markers.
    a.addMarkers() //Used the layout to construct the markers.
    $(a.dom).css({"display": "block", "transform": "scale(1)", "-webkit-transform": "scale(1)"}) //Makes it visible.
    $(a.dom).children().children("*").css({"display": "block"}) //Makes your content visible.





###DETAILS

Do you want a circle toolbar, a classy analgoue clock, a timer or anything remotely circular?
Typically ciruclar containers are difficult to work with, given current layouts and size/position styles were all designed for a box filled world.

This library takes care of the style issues related to circular layouts, freeing your design to be more, well... rounded.

They layout for the widget is simple.

```
--Bounding Circle (class is .tw-circle)
  ---Spacing Line (class is .tw-line)
    ------Marker (class is .tw-marker)
      ---------Marker Inner (class is .tw-markerinner)
        ------------Your content.
        
  ---Another Line (class is .tw-line)
    ------Another Marker (class is .tw-marker)
      ---------Another Marker Inner (class is .tw-markerinner)
        ------------More of your content.
```
        
The markerinners will automatically rotate to keep your content upright even if you choose to rotate the entire widget, assuming you use the .rotate variable.

Check out the wiki for more details.

Enjoy!
