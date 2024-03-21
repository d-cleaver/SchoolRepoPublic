import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {Card, CardBody, CardTitle, CardText} from "reactstrap";

/** Menu item details
 *
 * Accepts items and cantFind as props.
 * -items: list of snacks / drinks
 * -cantFind: redirect to new path if no item found with given id
 *
 */

function Item({items, cantFind}) {
  const {id} = useParams();

  let item = items.find((item) => item.id === id);
  if (!item) return <Redirect to={cantFind} />;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default Item;
