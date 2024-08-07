import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarStateService } from '../../services/activeScreen.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() sideNavStatus: boolean = false;
  @Input() activeScreen: string = 'user-dashboard';
  @Output() screenSelected = new EventEmitter<string>();

  constructor(private sidebarStateService: SidebarStateService) {
    this.sidebarStateService.activeScreen$.subscribe((screen) => {
      this.activeScreen = screen;
    });
    this.sidebarStateService.getExpandedState().subscribe((expandedState) => {
      this.list.forEach((item) => {
        if (expandedState[item.name] !== undefined) {
          item.expanded = expandedState[item.name];
        }
      });
    });
  }

  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      routes: {
        components: 'user-dashboard',
        path: 'user-homepage/user-dashboard',
      },
    },
    {
      number: '2',
      name: 'Profile',
      icon: 'fa-solid fa-user',
      routes: {
        components: 'user-profile',
        path: 'user-homepage/user-profile',
      },
    },
    // {
    //   number: '3',
    //   name: 'Invoice',
    //   icon: 'fa-solid fa-receipt',
    //   routes: {
    //     components: 'create-invoice',
    //     // path: 'user-homepage/create-invoice',
    //     path: 'user-homepage/edit-invoice',
    //   },
    // },
    {
      number: '3',
      name: 'Manage Invoice',
      icon: 'fa-solid fa-file-invoice-dollar',
      routes: {
        components: 'edit-invoice',
        path: 'user-homepage/edit-invoice',
      },
      children: [
        {
          name: 'View Invoice',
          icon: 'fa-solid fa-receipt', // Icon for child item
          routes: {
            components: 'edit-invoice',
            path: 'user-homepage/edit-invoice',
          },
        },
        // fa-solid fa-file-pen
        {
          name: 'Create Invoice',
          icon: 'fa-solid fa-file-invoice', // Icon for child item
          routes: {
            components: 'create-invoice',
            path: 'user-homepage/create-invoice',
          },
        },
      ],
      expanded: false, // Initialize the 'expanded' property
    },
    {
      number: '4',
      name: 'Manage Business',
      icon: 'fa-solid fa-building',
      routes: {
        components: 'edit-business',
        path: 'user-homepage/edit-business',
      },
      children: [
        {
          name: 'View Business',
          icon: 'fa-solid fa-building-circle-check', // Icon for child item
          routes: {
            components: 'view-business',
            path: 'user-homepage/view-business',
          },
        },
        // fa-solid fa-file-pen
        {
          name: 'Add Business',
          icon: 'fa-solid fa-building-user', // Icon for child item
          routes: {
            components: 'add-business',
            path: 'user-homepage/add-business',
          },
        },
      ],
      expanded: false, // Initialize the 'expanded' property
    },
    {
      number: '5',
      name: 'Manage Client',
      icon: 'fa-solid fa-users',
      routes: {
        components: 'edit-client',
        path: 'user-homepage/edit-client',
      },
      children: [
        {
          name: 'View Client',
          icon: 'fa-solid fa-id-card', // Icon for child item
          routes: {
            components: 'view-client',
            path: 'user-homepage/view-client',
          },
        },
        // fa-solid fa-file-pen
        {
          name: 'Add Client',
          icon: 'fa-solid fa-user-plus', // Icon for child item
          routes: {
            components: 'add-client',
            path: 'user-homepage/add-client',
          },
        },
      ],
      expanded: false, // Initialize the 'expanded' property
    },
    {
      number: '6',
      name: 'Manage Items',
      icon: 'fa-solid fa-store',
      routes: {
        components: 'edit-client',
        path: 'user-homepage/edit-client',
      },
      children: [
        {
          name: 'View Items',
          icon: 'fa-solid fa-box-open', // Icon for child item
          routes: {
            components: 'view-client',
            path: 'user-homepage/view-items',
          },
        },
        // fa-solid fa-file-pen
        {
          name: 'Add Items',
          icon: 'fa-solid fa-box-archive', // Icon for child item
          routes: {
            components: 'add-client',
            path: 'user-homepage/add-items',
          },
        },
      ],
      expanded: false, // Initialize the 'expanded' property
    },
    // {
    //   number: '7',
    //   name: 'Manage HSN Code',
    //   icon: 'fa-solid fa-file-lines',
    //   routes: {
    //     components: 'edit-client',
    //     path: 'user-homepage/edit-client',
    //   },
    //   children: [
    //     {
    //       name: 'View HSN Code',
    //       icon: 'fa-solid fa-barcode', // Icon for child item
    //       routes: {
    //         components: 'view-hsn-code',
    //         path: 'user-homepage/view-hsn-code',
    //       },
    //     },
    //     // fa-solid fa-file-pen
    //     {
    //       name: 'Add HSN Code',
    //       icon: 'fa-solid fa-file-circle-plus', // Icon for child item
    //       routes: {
    //         components: 'add-hsn-code',
    //         path: 'user-homepage/add-hsn-code',
    //       },
    //     },
    //   ],
    //   expanded: false, // Initialize the 'expanded' property
    // },
    {
      number: '7',
      name: 'Settings',
      icon: 'fa-solid fa-gear',
      routes: {
        components: 'edit-business',
        path: 'user-homepage/edit-business',
      },
    },
  ];
  hasActiveChild(children: any[]): boolean {
    return children.some(
      (child) => child.routes.components === this.activeScreen
    );
  }

  navigate(item: any) {
    if (item.children) {
      // item.expanded = !item.expanded;
      this.sidebarStateService.setExpandedState(item.name, !item.expanded);
    } else if (item.routes) {
      this.screenSelected.emit(item.routes.path);
      console.log(item, 'from navigation');

      this.sidebarStateService.setActiveScreen(item.routes.components);
    }
  }

  // selectScreen(routePath: any) {
  //   console.log(routePath.routes.path, 'hii');

  //   // this.screenSelected.emit(routePath.routes.path);
  //   // this.activeScreen = routePath.routes.components;
  //   // this.sidebarStateService.setActiveScreen(routePath.routes.components);
  // }
}
