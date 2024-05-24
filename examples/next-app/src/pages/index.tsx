import { useEffect, useState } from "react";
import InstillClient, { Pipeline, User } from "instill-sdk";

export default function TypescriptSdkDemo() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [user, setUser] = useState<User[]>([]);

  const client = new InstillClient(
    "http://localhost:8080",
    "v1beta",
    "instill_sk_pgybOAbZmtjB7S5DTDJcmryE7utibLAN" // console API token from http://localhost:3000/settings
  );

  useEffect(() => {
    client.Auth.getUserQuery({ userName: "users/admin" })
      .then((data: any) => {
        console.log("data", data);
        setUser(data);
      })
      .catch((error: any) => {
        console.log("error", error);
      });

    client.Pipeline.listPipelinesQuery({
      pageSize: null,
      nextPageToken: null,
    })
      .then((data: any) => {
        console.log("data", data);
        setPipelines(data);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <h1>User Data</h1>
      <pre style={{ backgroundColor: "white" }}>
        {JSON.stringify(user, null, 4)}
      </pre>

      <h1>Pipelines List</h1>
      <pre style={{ backgroundColor: "white" }}>
        {JSON.stringify(pipelines, null, 4)}
      </pre>
    </>
  );
}

// Console Token Implementation

// import { useEffect, useState } from "react";
// import InstillClient, {
//   Nullable,
//   Pipeline,
//   User,
// } from "instill-sdk";

// export default function TypescriptSdkDemo() {
//   const [pipelines, setPipelines] = useState<Pipeline[]>([]);
//   const [user, setUser] = useState<User[]>([]);

//   const client = new InstillClient(
//     "https://api.instill.tech",
//     "v1beta",
//     "instill_sk_OwuGQ8RGL6ObzYsneAG9Mib1k6zi9Gmj" // console API token
//   );

//   useEffect(() => {
//     client.Auth.getUserQuery()
//       .then((data: any) => {
//         console.log("data", data);
//         setUser(data);
//       })
//       .catch((error: any) => {
//         console.log("error", error);
//       });

//     client.Pipeline.listPipelinesQuery({
//       pageSize: null,
//       nextPageToken: null,
//     })
//       .then((data: any) => {
//         console.log("data", data);
//         setPipelines(data);
//       })
//       .catch((error: any) => {
//         console.log("error", error);
//       });
//   }, []);

//   return (
//     <>
//       <h1>User Data</h1>
//       <pre style={{ backgroundColor: "white" }}>
//         {JSON.stringify(user, null, 4)}
//       </pre>

//       <h1>Pipelines List</h1>
//       <pre style={{ backgroundColor: "white" }}>
//         {JSON.stringify(pipelines, null, 4)}
//       </pre>
//     </>
//   );
// }
