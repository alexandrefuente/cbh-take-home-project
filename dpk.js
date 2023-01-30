const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// Create a hash candidate separated to avoid duplicate
exports.createHashCandidate = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

/**
 * Separate the candidate responsabilities
 * Everything related to candidate should be here
 * Removed some nested conditional
 * Removed uncessary ELSE
 *
 */
exports.verifyCandidate = (candidate) => {
  if (candidate && typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }
  if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
    return createHashCandidate(candidate);
  }

  return TRIVIAL_PARTITION_KEY;
};

/**
 * Verifying if exist event
 * If true need to pass on the rules
 * Removed extras nested conditional
 *
 *  */
exports.existEvent = (event) => {
  if (event.partitionKey) {
    return event.partitionKey;
  } else {
    return this.createHashCandidate(JSON.stringify(event));
  }
};

exports.deterministicPartitionKey = (event) => {
  let candidate;
  /**
   * Removed all code that could be separated
   * in the own resposabilities
   *
   */
  if (event) {
    candidate = this.existEvent(event);
  }
  return this.verifyCandidate(candidate);
};
