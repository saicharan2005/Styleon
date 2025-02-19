import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";


export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];


// eslint-disable-next-line react/prop-types
function MenuItems({setOpen}) {
    const navigate = useNavigate();
  return (
    <nav className="mt-8  text-xl flex-col flex gap-2">
      {adminSidebarMenuItems.map((MenuItem) => (
        <div
          key={MenuItem.id}
          onClick={() => {
            navigate(MenuItem.path)
            setOpen? setOpen(false):null
          }
          }
          className="flex items-center gap-2  px-3 py-2 rounded-md  text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        >
          {MenuItem.icon}
          <span>{MenuItem.label} </span>
        </div>
      ))}
    </nav>
  );
}

// eslint-disable-next-line react/prop-types
function AdminSideBar({open,setOpen}) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={ setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
