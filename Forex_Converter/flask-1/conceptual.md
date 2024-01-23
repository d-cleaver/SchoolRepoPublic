### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

  Python and JS have different syntax. Python throws more errors than JS. In areas where JS would return undefined (allowing programmers to take advantage of this), python throws an error. Python allows for comparisons between dictionaries and lists (dictionaries/lists with same key/values are considered == in python), JS does not.

- Given a dictionary like `{"a": 1, "b": 2}`: , list two ways you
  can try to get a missing key (like "c") _without_ your programming
  crashing.

  ```py
  if key in dict:
    dict['key']
  ```

  dict.keys()

- What is a unit test?

Testing done to see if an individual component works

- What is an integration test?

Testing if parts works together

- What is the role of web application framework, like Flask?

Set of functions,classes, etc that help define which requests to respond to and how to respond to them.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

  It depends on the situation. We use query string parameters when describing the object we are on as opposed to using the route for the object itself. I would use the URL query param for use with a form, and use the route URL as a route to more information on the object.

- How do you collect data from a URL placeholder parameter using Flask?

You can specify the variable in the app.route and then use that variable as a paramater in the routing function. Here is an example of the pretzel:

```py
  @app.route('/foods/<food>')
  def grocery(food):
      x = food
```

- How do you collect data from the query string using Flask?

request.args dictionary

- How do you collect data from the body of the request using Flask?

request.form dictionary

- What is a cookie and what kinds of things are they commonly used for?

Cookies are string that save "state". Basically, a way to store small bits of information on the client browser vs your server. Cookies are in dictionary syntax. Cookies allow user to resume a session vs starting over on every new visit or refresh.

- What is the session object in Flask?

The session object is built off of using cookies. It allows the server to set many different things in the in the session for the client to remember wihout having to create many different cookies and just have one session. It is also encoded so that someone can't change session data on the client before sending it to the server.

- What does Flask's `jsonify()` do?

Takes JSON data in python and converts it to a JSON string
