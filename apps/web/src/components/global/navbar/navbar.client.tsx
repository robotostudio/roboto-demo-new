'use client';

import React, { FC } from 'react';
import { NavbarLink, PageComponentProps } from '~/types';
import { NavbarData } from './navbar-api';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import Link from 'next/link';
import { cn } from '~/lib/utils';
import { SanityIcon } from '../sanity-icon';
import { Buttons } from '../buttons';
import Image from 'next/image';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: { svg?: string } }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 hover:bg-accent">
            <span>{icon && <SanityIcon icon={icon} />}</span>
            <div className="">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export const NavItem: FC<{ data: NavbarLink }> = ({ data }) => {
  const { _type, title } = data;
  if (_type === 'navLink') {
    const { href, openInNewTab } = data?.url ?? {};
    return (
      <NavigationMenuItem>
        {href && (
          <Link href={href} passHref legacyBehavior>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              target={openInNewTab ? '_blank' : undefined}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
            >
              {title}
            </NavigationMenuLink>
          </Link>
        )}
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {Array.isArray(data?.columns) &&
            data.columns.map((item) => (
              <ListItem
                key={item._key}
                title={item.title}
                href={item.url.href}
                icon={item.icon}
              >
                {item.description}
              </ListItem>
            ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export const NavbarClient: FC<PageComponentProps<NavbarData>> = ({ data }) => {
  const { buttons, links, logo } = data ?? {};
  return (
    <nav className="grid grid-cols-3  bg-purple-300 p-4">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={70}
            height={40}
            className="h-10 w-16"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            {Array.isArray(links) &&
              links.map((link) => <NavItem data={link} key={link._key} />)}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto">
        <Buttons buttons={buttons} />
      </div>
    </nav>
  );
};
