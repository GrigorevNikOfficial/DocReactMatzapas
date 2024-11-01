import React from "react"; 
import { Menu } from "antd"; 
import SubMenu from "antd/lib/menu/SubMenu"; 
import { Link } from "react-router-dom"; 
import { ROUTE_PATHS } from "../../router/paths"; 

 

export const Navigation = ({ 
 /** children - дочерний код, который будет находится */ 
 /** внутри <Navigation>___</Navigation> */ 
 children, 
 ...props 

}) => { 

 
 return ( 
   <div> 
    <Menu 
      mode={'horizontal'} 
      theme={'dark'} 
      defaultActiveFirst={'menu-1'} 
    > 
      <Menu.Item key={'menu-1'}> 
       {/*  
         Link - компонент из react-router-dom 
         он меняет значение адресной строки  
         без перезагрузки страницы. 

 
         Атрибут "to" принимает значения, 
         которые обрабатываются в роутере. 
         Их мы прописывали в ROUTE_PATHS 
          
       */} 
       <Link to={ROUTE_PATHS.matzapas.list}> 
         Документы 
       </Link> 
      </Menu.Item> 

 
      <SubMenu title={'Справочники'} key={'sub-1'}> 

 
       <Menu.Item key={'menu-2'}> 
         <Link to={ROUTE_PATHS.directors}> 
          Директора 
         </Link> 
       </Menu.Item> 

 
       <Menu.Item key={'menu-3'}> 
         <Link to={ROUTE_PATHS.companies}> 
          Компании 
         </Link> 
       </Menu.Item> 

 
       <Menu.Item key={'menu-4'}> 
         <Link to={ROUTE_PATHS.materials}> 
          Материалы 
         </Link> 
       </Menu.Item> 

 
      </SubMenu> 

 
      <Menu.Item key="link"> 
       Выход 
      </Menu.Item> 
    </Menu> 

 
    {/*  
      После Navigation 
      будет отрисован тот компонент, 
      который соответсвует текущему значению  
      адресной строки 
    */} 
    {children} 
   </div> 
 ) 

} 