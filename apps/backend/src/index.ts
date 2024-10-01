import express,{ Express, Request, Response} from "express"
import projectRoutes from "./routes/projectRoutes";
const PORT = 4000;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/project', projectRoutes);

app.get('/test', (req:Request, res: Response)=>{
    res.send("Hello, backend is working...");
});

app.listen(PORT, ()=>{
    console.log(`Listing on port ${PORT}`);
})