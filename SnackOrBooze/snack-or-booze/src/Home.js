import React from "react";
import {Card, CardBody, CardTitle, CardText} from "reactstrap";

/** Homepage
 *
 * accept snack and drinks as props
 * -snacks: list of snacks
 * -drinks: list of drinks
 */

function Home({snacks, drinks}) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold">
            Welcome to Silicon Valley's premier dive cafe!
          </CardTitle>
          <CardText>
            Snack-or-Booze Menu Has {snacks.length} Snacks and {drinks.length}{" "}
            Drinks For You To Choose From!
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
