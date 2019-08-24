const path = require("path");
const types = {
  text: "text",
  progress: "progress",
};
const isProduction = process.env.NODE_ENV === "production";

module.exports.generateStaticAssets = async (req, res) => {
  try {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    if (!isProduction) {
      return res.end(
        JSON.stringify({
          type: types.text,
          message: "Cannot process this request in non production mode",
        }),
      );
    }

    const scrape = require("website-scraper");
    scrape({
      urls: [process.env.rootUrl],
      urlFilter: url => url.startsWith(process.env.rootUrl), // Filter links to other websites
      recursive: true,
      maxRecursiveDepth: 10,
      filenameGenerator: "bySiteStructure",
      directory: path.join(__dirname, "../../letterpad-static"),
    });
    res.end(JSON.stringify({ type: types.progress, message: 100 }));
  } catch (error) {
    res.end(JSON.stringify({ type: types.text, message: error.message }));
  }
};

module.exports.createPullRequest = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  const exec = require("child_process").exec;
  const testscript = exec("sh ./admin/static-generator/createPr.sh");

  testscript.stdout.on("data", chunk => {
    const data = chunk.toString("utf8");
    res.write(JSON.stringify({ type: types.text, message: data }));
  });

  testscript.on("data", function(err) {
    res.end(JSON.stringify({ type: types.text, message: err.message }));
  });

  testscript.on("close", function() {
    res.end(JSON.stringify({ type: types.text, message: "done" }));
  });
};
