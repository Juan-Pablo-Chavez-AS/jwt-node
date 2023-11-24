-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "password_hash" VARCHAR,
    "token" VARCHAR,

    CONSTRAINT "client_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_pk_un" ON "client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "client_un" ON "client"("username");
