import { useEffect,useState } from "react";
import api from "@/api/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";


const Complaints = () => {

  const [complaints,setComplaints] = useState([]);

  const [slaComplaints,setSlaComplaints] = useState([]);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    const loadData = async()=>{

      try{

        const [
          complaintsResponse,
          slaResponse
        ] = await Promise.all([

          api.get("/complaints"),

          api.get("/dashboard/sla")

        ]);



        setComplaints(
          complaintsResponse.data
        );


        setSlaComplaints(
          slaResponse.data
        );



      }catch(error){

        console.log(error);

        toast.error(
          "Failed to load complaints"
        );


      }finally{

        setLoading(false);

      }

    };


    loadData();


  },[]);




  if(loading){

    return(

      <div className="flex justify-center py-10">

        Loading...

      </div>

    );

  }



  return(

    <div className="space-y-8">


      <div>

        <h1 className="text-3xl font-bold">
          Complaints Management
        </h1>

        <p className="text-muted-foreground">
          Manage complaints and monitor SLA
        </p>

      </div>





      {/* NORMAL COMPLAINTS */}


      <Card>


        <CardHeader>

          <CardTitle>
            All Complaints ({complaints.length})
          </CardTitle>

        </CardHeader>


        <CardContent>


          {
            complaints.length===0 ?


            <p className="text-center py-5 text-muted-foreground">
              No complaints
            </p>


            :


            <div className="overflow-x-auto">


            <table className="w-full">


            <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Citizen
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Department
              </th>

              <th className="p-3 text-left">
                Priority
              </th>

              <th className="p-3 text-left">
                Status
              </th>

            </tr>

            </thead>



            <tbody>


            {
              complaints.map((c)=>(

                <tr
                  key={c.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {c.title}
                  </td>


                  <td className="p-3">
                    {c.citizen}
                  </td>


                  <td className="p-3">
                    {c.category}
                  </td>


                  <td className="p-3">
                    {c.department}
                  </td>


                  <td className="p-3">
                    {c.priority}
                  </td>


                  <td className="p-3">
                    {c.status}
                  </td>


                </tr>

              ))
            }


            </tbody>


            </table>


            </div>

          }


        </CardContent>


      </Card>







      {/* SLA LIST */}



      <Card>


        <CardHeader>


          <CardTitle className="text-red-600">

            SLA Monitoring ({slaComplaints.length})

          </CardTitle>


        </CardHeader>



        <CardContent>


        {
          slaComplaints.length===0 ?


          (

            <p className="text-center py-5 text-muted-foreground">

              No overdue complaints 🎉

            </p>

          )


          :


          (

          <div className="overflow-x-auto">


          <table className="w-full">


          <thead>

          <tr className="border-b">


            <th className="p-3 text-left">
              Complaint
            </th>


            <th className="p-3 text-left">
              Department
            </th>


            <th className="p-3 text-left">
              Priority
            </th>


            <th className="p-3 text-left">
              Deadline
            </th>


            <th className="p-3 text-left">
              Status
            </th>


          </tr>


          </thead>




          <tbody>


          {
            slaComplaints.map((c)=>(

              <tr
                key={c.id}
                className="border-b"
              >


                <td className="p-3 font-semibold">
                  {c.title}
                </td>


                <td className="p-3">
                  {c.department}
                </td>


                <td className="p-3">
                  {c.priority}
                </td>


                <td className="p-3">
                  {new Date(
                    c.deadline
                  ).toLocaleString()}
                </td>


                <td className="p-3">

                  <Badge variant="destructive">
                    OVERDUE
                  </Badge>

                </td>


              </tr>


            ))
          }


          </tbody>


          </table>


          </div>

          )

        }


        </CardContent>


      </Card>



    </div>

  );

};


export default Complaints;