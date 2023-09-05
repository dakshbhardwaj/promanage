import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EmployeeDetails from "../../components/EmployeeDetails";
import axios from "axios";

const EmployeePage = () => {
  const router = useRouter();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios
      .get(`https://promanage-fpft.onrender.com/user/${router.query.id}`)
      .then((res) => {
        console.log(res.data);
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return (
    <div>
      <EmployeeDetails employee={employee} />
    </div>
  );
};

export default EmployeePage;
