--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: exchange; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exchange (
    exchange_id integer NOT NULL,
    source_currency character varying NOT NULL,
    target_currency character varying NOT NULL,
    amount numeric(10,6) DEFAULT '0'::numeric NOT NULL,
    converted_amount numeric(10,6) DEFAULT '0'::numeric NOT NULL,
    rate numeric(10,6) DEFAULT '0'::numeric NOT NULL
);


ALTER TABLE public.exchange OWNER TO postgres;

--
-- Name: exchange_exchange_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exchange_exchange_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exchange_exchange_id_seq OWNER TO postgres;

--
-- Name: exchange_exchange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exchange_exchange_id_seq OWNED BY public.exchange.exchange_id;


--
-- Name: exchange_rate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exchange_rate (
    id integer NOT NULL,
    source_currency character varying NOT NULL,
    target_currency character varying NOT NULL,
    rate numeric(10,6) DEFAULT '0'::numeric NOT NULL
);


ALTER TABLE public.exchange_rate OWNER TO postgres;

--
-- Name: exchange_rate_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exchange_rate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exchange_rate_id_seq OWNER TO postgres;

--
-- Name: exchange_rate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exchange_rate_id_seq OWNED BY public.exchange_rate.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_user_id_seq OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: exchange exchange_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchange ALTER COLUMN exchange_id SET DEFAULT nextval('public.exchange_exchange_id_seq'::regclass);


--
-- Name: exchange_rate id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchange_rate ALTER COLUMN id SET DEFAULT nextval('public.exchange_rate_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: exchange; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exchange (exchange_id, source_currency, target_currency, amount, converted_amount, rate) FROM stdin;
4	PEN	USD	10.000000	2.700000	0.270000
5	PEN	USD	10.000000	2.700000	0.270000
6	PEN	USD	10.000000	2.700000	0.270000
7	PEN	USD	10.000000	2.700000	0.270000
8	PEN	USD	10.000000	2.700000	0.270000
9	PEN	USD	10.000000	2.700000	0.270000
10	PEN	USD	10.000000	2.900000	0.290000
11	USD	PEN	10.000000	38.500000	3.850000
12	USD	PEN	10.000000	38.500000	3.850000
\.


--
-- Data for Name: exchange_rate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exchange_rate (id, source_currency, target_currency, rate) FROM stdin;
1	PEN	USD	0.290000
2	USD	PEN	3.450000
3	EUR	USD	1.120000
4	USD	EUR	0.890000
5	GBP	USD	1.350000
6	USD	GBP	0.740000
7	JPY	USD	0.008900
8	USD	JPY	112.500000
9	CAD	USD	0.780000
10	USD	CAD	1.280000
11	AUD	USD	0.710000
12	USD	AUD	1.410000
13	INR	USD	0.013000
14	USD	INR	76.920000
15	BRL	USD	0.190000
16	USD	BRL	5.260000
17	ZAR	USD	0.065000
18	USD	ZAR	15.380000
19	MXN	USD	0.050000
20	USD	MXN	20.000000
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1703107828782	Undefined1703107828782
2	1703114313743	Undefined1703114313743
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, username, first_name, last_name, email, password) FROM stdin;
1	john	jhon	Wick	john@gmail.com	changeme
\.


--
-- Name: exchange_exchange_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exchange_exchange_id_seq', 12, true);


--
-- Name: exchange_rate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exchange_rate_id_seq', 2, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_user_id_seq', 2, true);


--
-- Name: exchange_rate PK_5c5d27d2b900ef6cdeef0398472; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchange_rate
    ADD CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY (id);


--
-- Name: user PK_758b8ce7c18b9d347461b30228d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: exchange PK_e63cd520e969a38c958d9a10cb6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exchange
    ADD CONSTRAINT "PK_e63cd520e969a38c958d9a10cb6" PRIMARY KEY (exchange_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

