import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Pipeline, listPipelinesQuery } from "@instill-ai/typescript-sdk";

const inter = Inter({ subsets: ["latin"] });

export default function TypescriptSdkDemo() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  useEffect(() => {
    // Pipeline

    listPipelinesQuery({
      pageSize: 6,
      nextPageToken: null,
      accessToken: null,
    })
      .then((data) => {
        console.log("data", data);
        setPipelines(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {JSON.stringify(pipelines)}
    </main>
  );
}
