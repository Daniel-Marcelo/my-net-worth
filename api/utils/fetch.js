module.exports.myFetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
