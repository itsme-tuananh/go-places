import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceList.css';

const PlaceList = (props) => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        {auth.isLoggedIn && auth.userId === userId && (
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <Button to="/places/new">Share Place</Button>
          </Card>
        )}
        {auth.isLoggedIn && auth.userId !== userId && (
          <Card>
            <h2>No places found.</h2>
          </Card>
        )}
        {!auth.isLoggedIn && (
          <Card>
            <h2>No places found.</h2>
          </Card>
        )}
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
