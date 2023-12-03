--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    number_guesses integer NOT NULL,
    user_id integer
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (1, 11, 25);
INSERT INTO public.games VALUES (2, 13, 25);
INSERT INTO public.games VALUES (3, 13, 26);
INSERT INTO public.games VALUES (4, 61, 26);
INSERT INTO public.games VALUES (5, 17, 27);
INSERT INTO public.games VALUES (6, 10, 27);
INSERT INTO public.games VALUES (7, 17, 26);
INSERT INTO public.games VALUES (8, 93, 26);
INSERT INTO public.games VALUES (9, 26, 26);
INSERT INTO public.games VALUES (10, 7, 28);
INSERT INTO public.games VALUES (11, 28, 28);
INSERT INTO public.games VALUES (12, 38, 29);
INSERT INTO public.games VALUES (13, 93, 29);
INSERT INTO public.games VALUES (14, 92, 28);
INSERT INTO public.games VALUES (15, 70, 28);
INSERT INTO public.games VALUES (16, 98, 28);
INSERT INTO public.games VALUES (17, 3, 30);
INSERT INTO public.games VALUES (18, 92, 30);
INSERT INTO public.games VALUES (19, 19, 31);
INSERT INTO public.games VALUES (20, 26, 31);
INSERT INTO public.games VALUES (21, 12, 30);
INSERT INTO public.games VALUES (22, 17, 30);
INSERT INTO public.games VALUES (23, 32, 30);
INSERT INTO public.games VALUES (24, 750, 32);
INSERT INTO public.games VALUES (25, 670, 32);
INSERT INTO public.games VALUES (26, 654, 33);
INSERT INTO public.games VALUES (27, 982, 33);
INSERT INTO public.games VALUES (28, 298, 32);
INSERT INTO public.games VALUES (29, 342, 32);
INSERT INTO public.games VALUES (30, 896, 32);
INSERT INTO public.games VALUES (31, 391, 34);
INSERT INTO public.games VALUES (32, 502, 34);
INSERT INTO public.games VALUES (33, 548, 35);
INSERT INTO public.games VALUES (34, 18, 35);
INSERT INTO public.games VALUES (35, 54, 34);
INSERT INTO public.games VALUES (36, 4, 34);
INSERT INTO public.games VALUES (37, 120, 34);
INSERT INTO public.games VALUES (38, 486, 36);
INSERT INTO public.games VALUES (39, 291, 36);
INSERT INTO public.games VALUES (40, 602, 37);
INSERT INTO public.games VALUES (41, 361, 37);
INSERT INTO public.games VALUES (42, 315, 36);
INSERT INTO public.games VALUES (43, 991, 36);
INSERT INTO public.games VALUES (44, 572, 36);
INSERT INTO public.games VALUES (45, 783, 38);
INSERT INTO public.games VALUES (46, 175, 38);
INSERT INTO public.games VALUES (47, 608, 39);
INSERT INTO public.games VALUES (48, 901, 39);
INSERT INTO public.games VALUES (49, 704, 38);
INSERT INTO public.games VALUES (50, 756, 38);
INSERT INTO public.games VALUES (51, 852, 38);
INSERT INTO public.games VALUES (52, 870, 40);
INSERT INTO public.games VALUES (53, 918, 40);
INSERT INTO public.games VALUES (54, 666, 41);
INSERT INTO public.games VALUES (55, 115, 41);
INSERT INTO public.games VALUES (56, 626, 40);
INSERT INTO public.games VALUES (57, 576, 40);
INSERT INTO public.games VALUES (58, 480, 40);
INSERT INTO public.games VALUES (59, 927, 42);
INSERT INTO public.games VALUES (60, 992, 42);
INSERT INTO public.games VALUES (61, 178, 43);
INSERT INTO public.games VALUES (62, 138, 43);
INSERT INTO public.games VALUES (63, 557, 42);
INSERT INTO public.games VALUES (64, 545, 42);
INSERT INTO public.games VALUES (65, 186, 42);
INSERT INTO public.games VALUES (66, 457, 44);
INSERT INTO public.games VALUES (67, 971, 44);
INSERT INTO public.games VALUES (68, 109, 45);
INSERT INTO public.games VALUES (69, 262, 45);
INSERT INTO public.games VALUES (70, 861, 44);
INSERT INTO public.games VALUES (71, 115, 44);
INSERT INTO public.games VALUES (72, 337, 44);
INSERT INTO public.games VALUES (73, 963, 46);
INSERT INTO public.games VALUES (74, 790, 46);
INSERT INTO public.games VALUES (75, 87, 47);
INSERT INTO public.games VALUES (76, 96, 47);
INSERT INTO public.games VALUES (77, 708, 46);
INSERT INTO public.games VALUES (78, 802, 46);
INSERT INTO public.games VALUES (79, 226, 46);
INSERT INTO public.games VALUES (80, 938, 48);
INSERT INTO public.games VALUES (81, 40, 48);
INSERT INTO public.games VALUES (82, 750, 49);
INSERT INTO public.games VALUES (83, 595, 49);
INSERT INTO public.games VALUES (84, 206, 48);
INSERT INTO public.games VALUES (85, 542, 48);
INSERT INTO public.games VALUES (86, 667, 48);
INSERT INTO public.games VALUES (87, 488, 50);
INSERT INTO public.games VALUES (88, 719, 50);
INSERT INTO public.games VALUES (89, 119, 51);
INSERT INTO public.games VALUES (90, 169, 51);
INSERT INTO public.games VALUES (91, 719, 50);
INSERT INTO public.games VALUES (92, 583, 50);
INSERT INTO public.games VALUES (93, 641, 50);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (1, 'pipi');
INSERT INTO public.users VALUES (2, '');
INSERT INTO public.users VALUES (16, 'user_1701611790990');
INSERT INTO public.users VALUES (17, 'user_1701611790989');
INSERT INTO public.users VALUES (18, 'jack');
INSERT INTO public.users VALUES (19, 'user_1701612336293');
INSERT INTO public.users VALUES (20, 'user_1701612336292');
INSERT INTO public.users VALUES (21, 'user_1701612345556');
INSERT INTO public.users VALUES (22, 'user_1701612345555');
INSERT INTO public.users VALUES (23, 'pi');
INSERT INTO public.users VALUES (24, 'kaka');
INSERT INTO public.users VALUES (25, 'piş');
INSERT INTO public.users VALUES (26, 'user_1701613725869');
INSERT INTO public.users VALUES (27, 'user_1701613725868');
INSERT INTO public.users VALUES (28, 'user_1701613893655');
INSERT INTO public.users VALUES (29, 'user_1701613893654');
INSERT INTO public.users VALUES (30, 'user_1701613931999');
INSERT INTO public.users VALUES (31, 'user_1701613931998');
INSERT INTO public.users VALUES (32, 'user_1701613952151');
INSERT INTO public.users VALUES (33, 'user_1701613952150');
INSERT INTO public.users VALUES (34, 'user_1701614001653');
INSERT INTO public.users VALUES (35, 'user_1701614001652');
INSERT INTO public.users VALUES (36, 'user_1701614035732');
INSERT INTO public.users VALUES (37, 'user_1701614035731');
INSERT INTO public.users VALUES (38, 'user_1701614116606');
INSERT INTO public.users VALUES (39, 'user_1701614116605');
INSERT INTO public.users VALUES (40, 'user_1701614171150');
INSERT INTO public.users VALUES (41, 'user_1701614171149');
INSERT INTO public.users VALUES (42, 'user_1701614190723');
INSERT INTO public.users VALUES (43, 'user_1701614190722');
INSERT INTO public.users VALUES (44, 'user_1701614200948');
INSERT INTO public.users VALUES (45, 'user_1701614200947');
INSERT INTO public.users VALUES (46, 'user_1701614234506');
INSERT INTO public.users VALUES (47, 'user_1701614234505');
INSERT INTO public.users VALUES (48, 'user_1701614238581');
INSERT INTO public.users VALUES (49, 'user_1701614238580');
INSERT INTO public.users VALUES (50, 'user_1701614457453');
INSERT INTO public.users VALUES (51, 'user_1701614457452');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 93, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 51, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: games games_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

