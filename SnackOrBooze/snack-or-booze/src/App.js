/** Main App
 *
 * Accepts no props
 *
 * State:
 * -snacks: axios calls snack data object
 * -drinks: axios calls drink data object
 * -isLoading: boolean, True if data is loaded
 *
 * */

import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import {getRefreshments, addItem as addItemApi} from "./Api";
import NavBar from "./NavBar";
import {Route, Switch} from "react-router-dom";
import Menu from "./Menu";
import Item from "./Item";
import slugify from "slugify";
import AddItemForm from "./AddItemForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState({
    snacks: [],
    drinks: [],
  });

  let {snacks, drinks} = menu;

  // load data from backend
  useEffect(() => {
    async function getAllItems() {
      let snacks = await getRefreshments("snacks");
      let drinks = await getRefreshments("drinks");
      setMenu({snacks, drinks});
      setIsLoading(false);
    }
    getAllItems();
  }, []);

  //************************************************************************************

  /** Call API to add item of type "snacks" or "drinks"; update state */

  async function addItem(type, {name, description, recipe, serve}) {
    // console.log(name);
    let id = slugify(name, {lower: true});
    // console.log(name);
    let objData = {id, name, description, recipe, serve};
    // console.log(name);
    await addItemApi(type, objData);
    // console.log(name);
    setMenu((m) => ({
      ...m,
      [type]: [...m[type], objData],
    }));
  }
  //************************************************************************************

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route
              exact
              path="/">
              <Home
                snacks={snacks}
                drinks={drinks}
              />
            </Route>

            <Route
              exact
              path="/snacks">
              <Menu
                items={snacks}
                title="snacks"
              />
            </Route>
            <Route
              exact
              path="/drinks">
              <Menu
                items={drinks}
                title="Drinks"
              />
            </Route>

            <Route path="/snacks/:id">
              <Item
                items={snacks}
                cantFind="/snacks"
              />
            </Route>
            <Route path="/drinks/:id">
              <Item
                items={drinks}
                cantFind="/drinks"
              />
            </Route>

            <Route path="/add">
              <AddItemForm addItem={addItem} />
            </Route>

            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
