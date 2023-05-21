import path from "path";
import { fileURLToPath } from "url";
import {uid} from 'uid';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export let products = [{
    id: uid(),
    name: "prod1",
    code: "PR01",
    price: 23
},
{
    id: uid(),
    name: "prod2",
    code: "PR02",
    price: 36
},
{
    id: uid(),
    name: "prod3",
    code: "PR03",
    price: 12
}
];