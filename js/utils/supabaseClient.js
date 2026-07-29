/**
 * ==========================================================================
 * 민경천 포트폴리오 - Supabase 연동 클라이언트 모듈 (supabaseClient.js)
 * 브라우저에 API Key가 노출되지 않도록 서버리스 API (/api/supabase)를 사용하거나
 * 동적 환경 변수를 참조하여 DB 조회를 처리함
 * ==========================================================================
 */

/**
 * Supabase DB에서 프로필 데이터를 서버 API를 통해 조회합니다
 * @returns {Promise<Object|null>} 프로필 데이터 객체 또는 실패 시 null
 */
export async function fetchProfileFromSupabase() {
    try {
        const res = await fetch('/api/supabase?table=profiles&id=mgc_profile');
        if (res.ok) {
            const result = await res.json();
            if (result.success && result.data && result.data.length > 0) {
                return result.data[0];
            }
        }
        return null;
    } catch (e) {
        console.warn("Supabase 프로필 연동 (서버 API) 처리 실패:", e);
        return null;
    }
}

/**
 * Supabase DB에 프로필(자기소개) 데이터를 저장/업데이트합니다
 * @param {Object} profile 
 * @returns {Promise<boolean>} 성공 여부
 */
export async function saveProfileToSupabase(profile) {
    try {
        const payload = {
            id: 'mgc_profile',
            name: profile.name,
            title: profile.title,
            headline: profile.headline,
            education: profile.education,
            bio: profile.bio,
            skills: profile.skills || {},
            email: profile.email || 'mgc59823@gmail.com',
            github: profile.github || 'https://github.com/mgc59823',
            updated_at: new Date().toISOString()
        };

        const res = await fetch('/api/supabase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'upsert',
                table: 'profiles',
                payload
            })
        });

        if (res.ok) {
            const result = await res.json();
            return result.success;
        }
        return false;
    } catch (e) {
        console.error("Supabase 프로필 저장 예외:", e);
        return false;
    }
}

/**
 * Supabase DB에서 프로젝트 목록을 조회합니다
 * @returns {Promise<Array|null>} 프로젝트 배열 또는 실패 시 null
 */
export async function fetchProjectsFromSupabase() {
    try {
        const res = await fetch('/api/supabase?table=projects');
        if (res.ok) {
            const result = await res.json();
            if (result.success && result.data) {
                return result.data.map(p => ({
                    id: p.id,
                    title: p.title,
                    category: p.category,
                    categoryName: p.category_name || p.categoryName,
                    summary: p.summary,
                    tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
                    image: p.image,
                    details: typeof p.details === 'string' ? JSON.parse(p.details) : p.details
                }));
            }
        }
        return null;
    } catch (e) {
        console.warn("Supabase 프로젝트 연동 실패:", e);
        return null;
    }
}

/**
 * Supabase DB에 신규 프로젝트를 저장합니다
 * @param {Object} project 
 * @returns {Promise<boolean>}
 */
export async function saveProjectToSupabase(project) {
    try {
        const payload = {
            id: project.id,
            title: project.title,
            category: project.category,
            category_name: project.categoryName,
            summary: project.summary,
            tags: project.tags,
            image: project.image,
            details: project.details,
            created_at: new Date().toISOString()
        };

        const res = await fetch('/api/supabase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'upsert',
                table: 'projects',
                payload
            })
        });

        if (res.ok) {
            const result = await res.json();
            return result.success;
        }
        return false;
    } catch (e) {
        console.error("Supabase 프로젝트 저장 예외:", e);
        return false;
    }
}

/**
 * Supabase DB에서 특정 프로젝트를 삭제합니다
 * @param {string} projectId 
 * @returns {Promise<boolean>}
 */
export async function deleteProjectFromSupabase(projectId) {
    try {
        const res = await fetch('/api/supabase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'delete',
                table: 'projects',
                id: projectId
            })
        });

        if (res.ok) {
            const result = await res.json();
            return result.success;
        }
        return false;
    } catch (e) {
        console.error("Supabase 프로젝트 삭제 예외:", e);
        return false;
    }
}
