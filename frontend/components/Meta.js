import Head from "next/head";

const Meta = () => (
  <div>
    <Head>
      {/* Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Link */}
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.1/antd.min.css" />
      {/* Title */}
      <title> Bouges toi ! </title>
    </Head>
  </div>
);

export default Meta;
