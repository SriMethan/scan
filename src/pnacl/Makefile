OBJS = bb_base.o bb_comp.o bb_index.o bit.o book.o common.o dxp.o eval.o \
       fen.o game.o hash.o hub.o libmy.o list.o main.o move.o move_gen.o \
       pos.o score.o search.o socket.o sort.o thread.o tt.o util.o var.o

HEADERS = $(wildcard ../*.hpp)

PNACL_TC_PATH = $(NACL_SDK_ROOT)/toolchain/linux_pnacl
PNACL_CXX = $(PNACL_TC_PATH)/bin/pnacl-clang++
PNACL_FINALIZE = $(PNACL_TC_PATH)/bin/pnacl-finalize

CXXFLAGS = -O2 -std=gnu++11 -pthread -fno-rtti -flto \
        -I$(NACL_SDK_ROOT)/include -I$(NACL_SDK_ROOT)/include/pnacl \
        -mllvm -inline-threshold=500 \
        -DNDEBUG -DIS_64BIT -DUSE_POPCNT -DNO_PREFETCH

LDFLAGS = -L$(NACL_SDK_ROOT)/lib/pnacl/Release -O2 -pthread -lppapi_simple_cpp -lnacl_io -lppapi_cpp -lppapi --pnacl-exceptions=sjlj

scan.nmf: scan.pexe scan.bc scan.nmf.in
        sed "s/PEXE_VERSION/$(shell sha256sum scan.pexe | cut -c1-8)/" scan.nmf.in | sed "s/BC_VERSION/$(shell sha256sum scan.bc | cut -c1-8)/" > scan.nmf

scan.pexe: scan.bc
        $(PNACL_FINALIZE) --compress -o $@ $<

scan.bc: $(OBJS)
        $(PNACL_CXX) -o $@ $(OBJS) $(LDFLAGS)

%.o: ../%.cpp $(HEADERS)
        $(PNACL_CXX) -c -o $@ $< $(CXXFLAGS)

clean:
        rm scan.pexe scan.bc *.o