import React, { Fragment, useContext, useState,} from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Context";
import {useHistory} from 'react-router-dom'

const Create = () => {
  
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  //
  const history = useHistory()

  //To get the current date
  const date = new Date()

  //To upload image and data to firebase
  const handleSubmit = () => {
    firebase.storage().ref(`/Product images/${image.name}`).put(image).then(({ref}) => {
      ref.getDownloadURL().then((url) => {
        console.log('img uploaded')
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        }).catch((err) => {
          console.log(err.code);
        })
      })
    }).catch((err) => {
      console.log(err.code);
    })
    history.push('/')
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={ name }
              onChange={(e) => setName(e.target.value)}
              name="Name"
              placeholder="Product Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={ category }
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              placeholder="Product category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              value={price }
              onChange={(e) => setPrice(e.target.value)}
              name="Price"
              placeholder="Product price"
            />
            <br />
         
          <br />
          <img alt="Images" width="200px" height="200px" src={ image ? URL.createObjectURL(image) : ''} ></img>
     
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={handleSubmit} >upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
