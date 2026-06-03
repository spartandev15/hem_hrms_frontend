export const Nav_List = [
  {
    label: "Employee",
    name: "Employee",
    subLinks: [
      {
        label: "Add Employee",
        href: "/dashboard/add-employee",
      },
      {
        label: "All Employee",
        href: "/dashboard/all/employees",
      },
      {
        label: "Leave",
        href: "/dashboard/leave-details",
      },
      // {
      //   label: "Provisional Employee",
      //   href: "",
      // },
      {
        label: "Category",
        href: "/dashboard/create/category",
      },

      {
        label: "Employee Birthday",
        href: "/dashboard/employees-birthdays",
      },

      {
        label: "Employee Work Anniversary",
        href: "/dashboard/employees-anniversary",
      },
    ],
  },
  {
    label: "Employees",
    name: "Employees",
    href: "/dashboard/employees",
  },
  {
    label: "Leave",
    name: "Leave",
    href: "/leaves-details",
  },
  {
    label: "OverTime",
    name: "OverTime",
    href: status === "HR" ? "/dashboard/overtime" : "/overtime",
    // href: "/overtime",
  },
  {
    label: "Documents",
    href: "Leave",
    name: "Documents",
  },
  {
    label: "Announcements",
    href: "announcements",
    name: "Announcements",
  },
  {
    label: "Recruitment",
    name: "Recruitment",
    href: "/dashboard/schedule-interviews",
  },
   {
    label: "Training & Internship",
    name: "Training&internship",
    subLinks: [
      {
        label: "Add Training internship",
        href: "training&internship",
      },
      {
        label: "List Training internship",
        href: "list-training&internship",
      },
    
    ],
  },
 
  
  // {
  //   label: "Recruitment",
  //   name: "Recruitment",
  //   subLinks: [
  //     // {
  //     //   label: "Vacancy",
  //     //   href: "/dashboard/vacancies",
  //     // },
  //     {
  //       label: "Schedule Interview",
  //       href: "/dashboard/schedule-interviews",
  //     },
  //   ],
  // },
];
