const app = require("./app");

const port = process.env.PORT || 7001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
