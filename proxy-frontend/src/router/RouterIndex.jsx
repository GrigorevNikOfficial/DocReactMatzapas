import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "../components/navigation/Navigation";

import { DirectorsView } from "../views/directors-view/DirectorsView";
import { CompaniesView } from "../views/companies-view/CompaniesView";
import { MaterialsView } from "../views/materials-view/MaterialsView";
import { MatzapasListView } from "../views/matzapas-view/matzapas-list-view/MatzapasListView";
import { MatzapasView } from "../views/matzapas-view/matzapas-view/MatzapasView";
import { MatzapasCreateView } from "../views/matzapas-view/matzapas-view/MatzapasCreateView";

import { IndividualsView } from "../views/individuals-view/IndividualsView";
import { OrganizationsView } from "../views/organizations-view/OrganizationsView";
import { ProductsView } from "../views/product-view/ProductsView";
import { ProxyListView } from "../views/proxy-view/proxy-list-view/ProxyListView";
import { ProxyView } from "../views/proxy-view/proxy-view/ProxyView";
import { ProxyCreateView } from "../views/proxy-view/proxy-view/ProxyCreateView";

import { ROUTE_PATHS } from "./paths";

export const RouterIndex = (props) => {
    return (
        <BrowserRouter>
            <Navigation>
                <Routes>
                    <Route
                        path={'/'}
                        element={<MatzapasListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.materials}
                        element={<MaterialsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.directors}
                        element={<DirectorsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.companies}
                        element={<CompaniesView />}
                    />
                    <Route
                        path={ROUTE_PATHS.matzapas.list}
                        element={<MatzapasListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.matzapas.matzapas}
                        element={<MatzapasView />}
                    />
                    <Route 
                     path={ROUTE_PATHS.create} 
                       element={<MatzapasCreateView />} 
                    />
                    <Route
                        path={'/'}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.products}
                        element={<ProductsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.individuals}
                        element={<IndividualsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.organizations}
                        element={<OrganizationsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.list}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.proxy}
                        element={<ProxyView />}
                    />
                    <Route 
                     path={ROUTE_PATHS.create1} 
                       element={<ProxyCreateView />} 
                    /> 
                </Routes>
            </Navigation>
        </BrowserRouter>
    )
}