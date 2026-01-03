import LogoutButton from "@/app/components/logout";



export function SiteHeader() {

 


  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) mb-6 m-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
       

           <nav className="bg-background w-full flex items-center gap-x-4">
        <div className="flex items-center justify-between w-full text-gray-600">
           <p >title</p>
           
        </div>
<LogoutButton/>
       </nav>

        
<nav className="bg-transparent px-3 py-2 w-full">
          
        </nav>
       
        

        
        
      </div>
    </header>
  )
}
