
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'hero', 'hero-outline', 'glow'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'xl', 'icon'],
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Default Button',
    },
};

export const Hero: Story = {
    args: {
        variant: 'hero',
        children: 'Hero Button',
    },
};

export const Glow: Story = {
    args: {
        variant: 'glow',
        children: 'Glow Button',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline Button',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large Button',
    },
};
