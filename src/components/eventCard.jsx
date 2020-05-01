import React, { useReducer } from "react";
import { useState } from "react";
import { Card, Skeleton, Avatar, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import avatar from "../img/tick.png";

const EventCard = (props) => {
  const [error, setError] = useState("");
  const bookEvent = () => {
    Axios({
      method: "post",
      url: `http://localhost:8080/api/events/userEvent=${props.user.jti}`,
      data: props.eventDetails,
      headers: {
        Authorization: `Bearer ${props.user.jwtCode}`,
      },
    })
      .then((res) => res)
      .catch((err) => {
        setError("You have already booked this event");
      });
  };
  return (
    <div>
      <Card style={{ width: 300, height: 270, marginTop: 16 }}>
        <Skeleton loading={props.isFetching} avatar active>
          <Meta
            avatar={<Avatar src={avatar} />}
            title={
              <>
                {props.eventDetails.name}
                <br />
                {<i>{`Created By: ${props.eventDetails.creator}`} </i>}
              </>
            }
            description={props.eventDetails.description}
          />
        </Skeleton>
        <Button
          disabled={props.user.aud !== "ROLE_USER"}
          className="mt-5 mx-3"
          type="primary"
          onClick={bookEvent}
        >
          Book
        </Button>
        <Button>Details</Button>
      </Card>
    </div>
  );
};

export default EventCard;
