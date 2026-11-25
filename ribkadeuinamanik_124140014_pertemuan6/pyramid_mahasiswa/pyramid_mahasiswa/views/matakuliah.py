from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import Matakuliah


@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    matakuliahs = request.dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}


@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'})
    return {'matakuliah': mk.to_dict()}


@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    try:
        data = request.json_body
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in data or data[field] is None or str(data[field]).strip() == '':
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

        try:
            sks = int(data['sks'])
            semester = int(data['semester'])
            if sks <= 0 or semester <= 0:
                return HTTPBadRequest(json_body={'error': 'Nilai sks dan semester harus lebih dari 0!'})
        except (ValueError, TypeError):
            return HTTPBadRequest(json_body={'error': 'Field sks dan semester harus berupa angka integer!'})

        mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=sks,
            semester=semester,
        )
        request.dbsession.add(mk)
        request.dbsession.flush()
        return {'success': True, 'matakuliah': mk.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'})

    try:
        data = request.json_body
        if 'kode_mk' in data:
            mk.kode_mk = data['kode_mk']
        if 'nama_mk' in data:
            mk.nama_mk = data['nama_mk']
        if 'sks' in data:
            sks = int(data['sks'])
            if sks <= 0:
                return HTTPBadRequest(json_body={'error': 'Nilai sks harus lebih dari 0!'})
            mk.sks = sks
        if 'semester' in data:
            semester = int(data['semester'])
            if semester <= 0:
                return HTTPBadRequest(json_body={'error': 'Nilai semester harus lebih dari 0!'})
            mk.semester = semester

        return {'success': True, 'matakuliah': mk.to_dict()}
    except (ValueError, TypeError):
        return HTTPBadRequest(json_body={'error': 'Field sks dan semester harus berupa angka integer!'})
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'})

    request.dbsession.delete(mk)
    return {'success': True, 'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus'}