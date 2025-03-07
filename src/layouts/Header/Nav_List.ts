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
    href: "/dashboard/leave-details",
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
    href: "/dashboard/employee",
    name: "Recruitment",
    subLinks: [
      {
        label: "Vacancy",
        href: "vacancies",
      },
      {
        label: "Schedule Interview",
        href: "schedule-interviews",
      },
    ],
  },
];
