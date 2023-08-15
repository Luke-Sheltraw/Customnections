'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Redirect = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/');
	}, [router]);

	return (
		<Link href="/">Redirecting...</Link>
	);
};

export default Redirect;