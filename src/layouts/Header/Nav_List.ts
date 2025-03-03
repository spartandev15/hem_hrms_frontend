export const Nav_List = [
  {
    label: "Employee",
    href: "Leave",
    subLinks: [
      {
        label: "Add Employee",
        href: "/dashboard/add-employee",
      },
      {
        label: "All Employee",
        href: "/dashboard/employees",
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
    label: "Leave",
    href: "/dashboard/leave-details",
  },
  {
    label: "OverTime",
    href: status === "HR" ? "/dashboard/overtime" : "/overtime",
    // href: "/overtime",
  },
  {
    label: "Documents",
    href: "Leave",
  },
  {
    label: "Announcements",
    href: "announcements",
  },
  {
    label: "Recruitment",
    href: "/dashboard/employee",
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
