const express= require('express');
const router= express.Router();
const fs=require("fs");
function Task(taskName,isDone)
{
    this.taskName=taskName;
    this.isDone=isDone;
}
router.get("/",(req,res)=>{
    console.log('hi');
    fs.readFile("storage.json",(err,data)=>{
        tasks=JSON.parse(data);

        res.json(tasks);
    })
})

router.get("/view/task/:id",(req,res)=>{
    id=Number(req.params.id);
    data=fs.readFileSync("storage.json");
    data=data.toString();

    tasks=JSON.parse(data);
    if(id>=0 && id<tasks.lenght)
    {
        res.json(tasks[id]);
    }
    else{
        res.json({
            error:"Task witth id:"+id.toString() +"not present"
        })
    }
});

router.post("/add/task",(req,res)=>{
    data=fs.readFileSync("storage.json");
    data=data.toString();

    tasks=JSON.parse(data);
    task=new Task(req.body.taskName,false);
    tasks.push(task);
    fs.writeFile("storage.json",JSON.stringify(tasks),(err,data)=>
    {
        if(err)
        {
            res.json({
                error:err
            })
        }
        else{
            res.json({
                response:"created"
            });
        }
    })
});

router.delete("/delete/task/:id",(req,res)=>{
    id=Number(req.params.id);
    data=fs.readFileSync("storage.json");
    data=data.toString();
    
    tasks=JSON.parse(data);

    if(id>=0 && id<tasks.length)
    {
        tasks.splice(id,1);

        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data)=>
        {
            if(err)
            {
                res.json({
                    error:err
                })
            }
            else{
                res.json({
                    response:"Deleted",
                    task_id:id
                });
            }

        })
    }
else{
    res.json({
        error:"Task witth id:"+id.toString() +"not present"
    })
}
})
router.put("/update/task/:id",(req,res)=>{
    id=Number(req.params.id);
    data=fs.readFileSync("storage.json");
    data=data.toString();
    
    tasks=JSON.parse(data);

    if(id>=0 && id<tasks.length)
    {
        tasks[id].taskName=req.body.taskName;
        tasks[id].isDone=req.body.isDone;
        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data)=>
        {
            if(err)
            {
                res.json({
                    error:err
                })
            }
            else{
                res.json({
                    response:"updated",
                    task_id:id
                });
            }

        })
    }
else{
    res.json({
        error:"Task witth id:"+id.toString() +"not present"
    })
}
})
module.exports=router;