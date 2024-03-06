'use client';

import { FC } from 'react';
import { PageComponentProps } from '~/types';
import { NavbarData } from './navbar-api';

export const NavbarClient: FC<PageComponentProps<NavbarData>> = ({ data }) => {
  console.log('navbar: ', data);
  return <nav>Navbar</nav>;
};
