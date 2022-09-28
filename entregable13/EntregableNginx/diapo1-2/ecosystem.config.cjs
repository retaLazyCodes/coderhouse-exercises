module.exports = {
  apps: [
    {
      name: "Server1",
      script: "index.js",
      watch: true,
      env: {
        PORT: 8080
      },
      node_args: ""
    },
    {
      name: "Server2",
      script: "index.js",
      watch: true,
      env: {
        PORT: 8081
      },
      exec_mode: "cluster",
      instances: 2,
      args: "-a 2 b 30",
      node_args: "--harmony --expose-gc"
    }
  ]
}
