const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Production uchun remote URL larni environment variable dan olamiz
const getRemoteUrl = (name, defaultPort) => {
    const envVar = process.env[`${name.toUpperCase()}_MF_URL`];
    if (envVar) return envVar;
    if (process.env.NODE_ENV === "production") {
        return name; // Vercel deploy uchun
    }
    return `http://localhost:${defaultPort}`;
};

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.tsx", // Entry point
    output: {
        publicPath: "auto", // Production uchun
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react", "@babel/preset-typescript"],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    plugins: [
        // Module Federation Plugin - bu container uchun asosiy plugin
        new ModuleFederationPlugin({
            name: "container", // Bu ilova nomi
            remotes: {
                // Bu yerda remote mikrofrontendlarni ro'yxatga olamiz
                // Production da environment variable orqali sozlanadi
                reactMF: `reactMF@${getRemoteUrl(
          "https://react-mf.vercel.app",
          3001
        )}/remoteEntry.js`,
                vueMF: `vueMF@${getRemoteUrl("vue", 3002)}/remoteEntry.js`,
                angularMF: `angularMF@${getRemoteUrl("angular", 3003)}/remoteEntry.js`,
            },
            shared: {
                // Shared dependencies - React va boshqa kutubxonalar
                // Bu orqali bir xil versiyalar ishlatiladi va bundle hajmi kamayadi
                react: {
                    singleton: true, // Faqat bitta instance bo'lishi kerak
                    requiredVersion: "^18.2.0",
                    eager: true, // React har doim kerak, shuning uchun eager yuklash
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: "^18.2.0",
                    eager: true, // React DOM ham har doim kerak
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};