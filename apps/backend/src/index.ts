import express,{ Express, Request, Response} from "express"

const PORT = 4000;

const app: Express = express();

app.get('/test', (req:Request, res: Response)=>{
    res.send("Hello, backend is working...");
});

app.listen(PORT, ()=>{
    console.log(`Listing on port ${PORT}`);
})