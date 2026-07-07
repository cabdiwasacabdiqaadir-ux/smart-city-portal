import { useEffect, useState } from "react";
import api from "@/api/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Users,
  User,
  ShieldCheck,
  UserCog,
  Building2,
  FolderTree,
  ClipboardList,
  Clock,
  Loader,
  CheckCircle,
} from "lucide-react";

import { toast } from "sonner";


const AdminDashboardHome = () => {

  const [loading,setLoading] = useState(true);

  const [stats,setStats] = useState({

    totalUsers:0,

    citizens:0,

    officers:0,

    admins:0,

    totalDepartments:0,

    totalCategories:0,

    totalComplaints:0,

    pendingComplaints:0,

    inProgressComplaints:0,

    resolvedComplaints:0,

  });



  useEffect(()=>{

    const loadDashboard = async()=>{

      try{

        const [
          dashboardResponse,
          usersResponse
        ] = await Promise.all([

          api.get("/dashboard"),

          api.get("/users")

        ]);



        const users = usersResponse.data;



        setStats({

          ...dashboardResponse.data,


          citizens:
            users.filter(
              user=>user.role==="CITIZEN"
            ).length,


          officers:
            users.filter(
              user=>user.role==="OFFICER"
            ).length,


          admins:
            users.filter(
              user=>user.role==="ADMIN"
            ).length,


        });



      }catch(error){

        console.log(error);

        toast.error(
          "Failed to load dashboard"
        );


      }finally{

        setLoading(false);

      }

    };


    loadDashboard();


  },[]);




  const cards=[


    {
      title:"Total Users",
      value:stats.totalUsers,
      icon:Users,
    },


    {
      title:"Citizens",
      value:stats.citizens,
      icon:User,
    },


    {
      title:"Officers",
      value:stats.officers,
      icon:ShieldCheck,
    },


    {
      title:"Admins",
      value:stats.admins,
      icon:UserCog,
    },


    {
      title:"Departments",
      value:stats.totalDepartments,
      icon:Building2,
    },


    {
      title:"Categories",
      value:stats.totalCategories,
      icon:FolderTree,
    },


    {
      title:"Complaints",
      value:stats.totalComplaints,
      icon:ClipboardList,
    },


    {
      title:"Pending",
      value:stats.pendingComplaints,
      icon:Clock,
    },


    {
      title:"In Progress",
      value:stats.inProgressComplaints,
      icon:Loader,
    },


    {
      title:"Resolved",
      value:stats.resolvedComplaints,
      icon:CheckCircle,
    },


  ];



  if(loading){

    return(

      <div className="flex justify-center py-20">

        Loading dashboard...

      </div>

    );

  }




  return(

    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground">
          Smart City Management System Overview
        </p>

      </div>




      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-5
        "
      >

        {
          cards.map((card)=>{

            const Icon = card.icon;


            return(

              <Card
                key={card.title}
                className="hover:shadow-lg transition"
              >

                <CardHeader
                  className="
                  flex
                  flex-row
                  justify-between
                  items-center
                  "
                >

                  <CardTitle>
                    {card.title}
                  </CardTitle>


                  <Icon className="h-6 w-6"/>


                </CardHeader>


                <CardContent>

                  <p className="text-4xl font-bold">
                    {card.value}
                  </p>

                </CardContent>


              </Card>

            );


          })
        }


      </div>


    </div>

  );

};


export default AdminDashboardHome;