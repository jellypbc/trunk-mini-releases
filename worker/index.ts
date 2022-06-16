import {
  consoleLogSink,
  createReflectServer,
} from '@rocicorp/reflect-server';
import { serverMutators } from '../src/datamodel/mutators';

function getLogSinks() {
  let logSinks = [consoleLogSink];
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


const { worker, RoomDO, AuthDO } = createReflectServer({
  mutators: serverMutators,
  authHandler,
  getLogSinks,
  getLogLevel: () => "info",
});
export { worker as default, RoomDO, AuthDO };
