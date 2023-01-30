# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Explanation Code

`createHashCandidate`
Create a hash candidate separated to avoid duplicate
```
  exports.createHashCandidate = (data) => {
    return crypto.createHash("sha3-512").update(data).digest("hex");
  };
```

`verifyCandidate`

 * Separate the candidate responsabilities
 * Everything related to candidate should be here
 * Removed some nested conditional
 * Removed uncessary ELSE

```
  exports.verifyCandidate = (candidate) => {
    if (candidate && typeof candidate !== "string") {
      return JSON.stringify(candidate);
    }
    if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
      return createHashCandidate(candidate);
    }

    return TRIVIAL_PARTITION_KEY;
  };
```

`existEvent`

 * Verifying if exist event
 * If true need to pass on the rules
 * Removed extras nested conditional

```
  exports.existEvent = (event) => {
    if (event.partitionKey) {
      return event.partitionKey;
    } else {
      return this.createHashCandidate(JSON.stringify(event));
    }
  };
```
