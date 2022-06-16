// import { Server as BaseServer } from "reps-do";
// export { worker as default } from "reps-do";

// import { mutators, type M } from "../src/datamodel/mutators";

import {
  consoleLogSink,
  DatadogLogSink,
  LogSink,
  createReflectServer,
  ReflectServerBaseEnv,
} from "@rocicorp/reflect-server";
import { serverMutators } from "../src/datamodel/mutators.js";

function getLogSinks(env: ReplidrawEnv): LogSink[] {
  let logSinks = [consoleLogSink];
  if (env.DATADOG_API_KEY) {
    logSinks.push(
      new DatadogLogSink({
        apiKey: env.DATADOG_API_KEY,
        service: "replidraw-do-grgbkr",
      })
    );
  }
  return logSinks;
}

const authHandler = async (auth: string, roomID: string) => {
  // Note a real implementation should use signed and encrypted auth tokens,
  // or store the auth tokens in a session database for validation.
  const authJson = JSON.parse(auth);
  if (!authJson) {
    throw Error("Empty auth");
  }
  if (authJson.roomID !== roomID) {
    throw new Error("incorrect roomID");
  }
  if (!authJson.userID || typeof authJson.userID !== "string") {
    throw new Error("Missing userID");
  }
  return {
    userID: authJson.userID,
  };
};

interface ReplidrawEnv extends ReflectServerBaseEnv {
  DATADOG_API_KEY?: string;
}

const { worker, RoomDO, AuthDO } = createReflectServer({
  mutators: serverMutators,
  authHandler,
  getLogSinks,
  getLogLevel: () => "info",
});
export { worker as default, RoomDO, AuthDO };


// export class Server extends BaseServer<M> {
//   constructor(state: DurableObjectState) {
//     super(mutators, state);
//   }
// }
