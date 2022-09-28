module.exports = {
  apps: [
    {
      name: "Server1",
      script: "index.js",
      watch: true,
      env: {
        PORT: 8080
      },
      node_args: "--expose-gc"
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
    },
    {
      name: "Server3",
      script: "index.js",
      watch: true,
      env: {
        PORT: 8082
      },
      exec_mode: "cluster",
      instances: 2,
      args: "-a 2 b 30",
      node_args: "--harmony --expose-gc"
    },
    {
      name: "Server4",
      script: "index.js",
      watch: true,
      env: {
        PORT: 8083
      },
      exec_mode: "cluster",
      instances: 2,
      args: "-a 2 b 30",
      node_args: "--harmony --expose-gc"
    },
    {
      name: "Server5",
      script: "index.js",
      watch: true,
      env: {
        PORT: 8084
      },
      exec_mode: "cluster",
      instances: 2,
      args: "-a 2 b 30",
      node_args: "--harmony --expose-gc"
    },
    {
      name: "Server6",
      script: "index.js",
      watch: true,
      env: {
        PORT: 8085
      },
      exec_mode: "cluster",
      instances: 2,
      args: "-a 2 b 30",
      node_args: "--harmony --expose-gc"
    },
  ]
}
