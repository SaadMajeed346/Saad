import { useState } from "react";
import {} from "https://unpkg.com/uport-connect/dist/uport-connect.js";
import "./style.css";
import {
  useQuery,
  useMutation
} from "@apollo/client";
import {addUserMutation} from '../queries/queries'
const Connect = window.uportconnect;
const uport = new Connect("MyDApp");

uport.requestDisclosure({
  requested: ["name", "email", "country", "phone"],
  notifications: true,
});
var did;
var json;
var obj;
var count =0;
function Login() {
  //Fetching data
  //const {loading, error, data} = useQuery(getdidQuery);
  //AddData
  const [addUserMut,{data,loading,error}] = useMutation(addUserMutation);
  // QR code
  const [isPending, setPending] = useState(true);

  //Checking query
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  uport.onResponse("disclosureReq").then((res) => {
    did = res.payload.did;
    json = JSON.stringify(res.payload);
    obj = JSON.parse(json);
    if(count===0){
      {addUserMut({
        variables:{
        userId:obj.did,
        },
      })}
      count++;
    }
    //console.log("in respones " + obj.phone.length);
    console.log(json, did, obj);
    setPending(false);
    console.log("in resoponse:** " + isPending);
  });
  
  
  return (
    <>
    
    <div id="container">
      {!isPending && Object.keys(obj).length !== 0 && (
        <div>
          {" "}
          <>
            <div className="header">
              <h1 className="greenTxt">Factiiv</h1>
              <p id="smallDesc">A decentrallized Credit Reporting</p>

              <h2 id="welcomeMsg">
                <span className="greenTxt">{obj.name} </span>Welcome Onboard!{" "}
              </h2>
            </div>
            <div id="credentials">
              {obj.name.length !== 0 &&(
                <p>
                  Name: <span id="name">{obj.name}</span>
                </p>
              )}
              {obj.email.length !== 0 && (
                <p>
                  Email: <span id="email">{obj.email}</span>
                </p>
              )}
              {obj.country.length !== 0 && (
                <p>
                  Country: <span id="country">{obj.country}</span>
                </p>
              )}
              {obj.phone.length !== 0 && (
                <p>
                  Phone: <span id="phone">{obj.phone}</span>

                </p>
              )}
              <p>
                <span id="did">{obj.did}</span>
              </p>
             
            </div>
          </>
        </div>
      )}
      {/* Saad Code */}
    </div>
    </>
  );
}

export default Login;